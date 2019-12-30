const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Class = require('@models/class');
const Period = require('@models/period');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/update', async function (request, response) {

    // Session
    console.log('Session started');
    const session = await Period.startSession();
    session.startTransaction();

    // Prepare
    let query = {
        _id: request.body._class
    };

    // Run
    console.log(`Finding Class to delete previous timetable`);
    Class.findOne(query, function (error, _class) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();
            console.log('Session aborted');

            console.log('Finding class failed');
            new Response(response, 400, null, null);
        } else if(!_class) {
            console.log('Class does not exists');
            new Response(response, 400, null, null);
        } else {
            console.log('Class found');

            // Run
            Period.deleteMany({ _id : { $in : _class.timetable }}, function(error, deleted){
                if(error) {
                    console.error(error);

                    session.abortTransaction();
                    session.endSession();
                    console.log('Session aborted');

                    console.log(`Deleting periods failed`);
                    new Response(response, 400, null, null);
                } else {
                    // Prepare
                    let periods = [];
                    let periodIds = [];
                    for(index = 0; index < request.body.periods.length; index++) {
                        let time = {
                            from: request.body.periods[index].from,
                            to: request.body.periods[index].to
                        };

                        let id = new ObjectId();
                        let period = new Period({
                            _id: id,
                            day: request.body.periods[index].day,
                            time: time,
                            subject: request.body.periods[index].subject,
                            teacher: request.body.periods[index].teacher
                        });
                    
                        periods.push(period);
                        periodIds.push(id);
                    }
                    
                    console.log(periods);
                    console.log(periodIds);
                    
                    // Run
                    console.log(`Creating Periods in batch`);
                    Period.insertMany(periods).then((periods) => {
                        console.log('Periods created');
                        // Prepare
                        query = {
                            _id: request.body._class
                        }
                    
                        // Run
                        console.log(`Updating Class ${request.body._class}`);
                        Class.findOneAndUpdate(query, {
                            timetable: periodIds
                        }, { runValidators: true, new: true }, function (error, _class) {
                            if (error) {
                                console.error(error);
                    
                                session.abortTransaction();
                                session.endSession();
                                console.log('Session aborted');
                    
                                new Response(response, 400, null, null);
                            } else {
                                console.log('Department slots udpated');
                    
                                session.commitTransaction();
                                session.endSession();
                                console.log('Session terminated');
                    
                                new Response(response, 200, null, _class);
                            }
                        });
                    }).catch((error) => {
                        console.error(error);
                    
                        session.abortTransaction();
                        session.endSession();
                        console.log('Session aborted');
                    
                        new Response(response, 400, null, null);
                    });
                }
            })
        }
    });
});

module.exports.router = router;