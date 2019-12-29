const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Department = require('@models/department');
const TimeSlot = require('@models/timeSlot');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/slot/update', async function (request, response) {

    // Session
    console.log('Session started');
    const session = await Department.startSession();
    session.startTransaction();

    // Prepare
    let query = {
        _id: request.body.department
    }

    // Run
    console.log('Finding department to delete time slots');
    Department.findOne(query, function (error, department) {
        if (error) {
            console.error(error);
            
            session.abortTransaction();
            session.endSession();
            console.log('Session aborted');

            console.log('Finding department failed');
            new Response(response, 400, null, null);
        } else {
            console.log('Department found');
            console.log(department);

            TimeSlot.deleteMany({ _id : { $in : department.timeSlots }}, function(error, deleted){
                if(error) {
                    console.error(error);

                    session.abortTransaction();
                    session.endSession();
                    console.log('Session aborted');

                    console.log(`Deleteing time slots failed`);
                    new Response(response, 400, null, null);
                } else {
                    console.log(`Deleted all Time slots of the department ${request.body.department}`);

                    // Prepare
                    let slots = [];
                    let slotIds = [];
                    for(index = 0; index < request.body.slots.length; index++) {
                        let id = new ObjectId();
                        let time = new TimeSlot({
                            _id: id,
                            from: request.body.slots[index].from,
                            to: request.body.slots[index].to
                        });
                    
                        slots.push(time);
                    }
                    
                    slots.sort(function(a, b) {
                        if(a.from < b.from) return -1;
                        if (a.from > b.from) return 1;
                        else return 0;
                    });
                    
                    for(index = 0; index < request.body.slots.length; index++) {
                        slotIds.push(slots[index]._id);
                    }
                    
                    console.log(slots);
                    console.log(slotIds);
                    
                    // Run
                    console.log(`Creating time slots in batch`);
                    TimeSlot.insertMany(slots).then((slots) => {
                        console.log('Slots created');
                        // Prepare
                        query = {
                            _id: request.body.department
                        }
                    
                        // Run
                        console.log(`Updating department ${request.body.department}`);
                        Department.findOneAndUpdate(query, {
                            timeSlots: slotIds
                        }, { runValidators: true, new: true }, function (error, organisation) {
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
                    
                                new Response(response, 200, null, organisation);
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
            });
        }
    });
});

module.exports.router = router;