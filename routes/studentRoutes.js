const express = require('express');
const router = express.Router();
const StudentModel = require('../models/studentModel');

// get all student
router.get('/', async (req, res) => {
    try {
        const students = await StudentModel.find({});
        res.json(students);
    } catch (error) {
        res.json(error);
    }
});

// get one student
router.get('/:id', getStudent, (req, res) => {
    res.json(res.student);
});

// create one student
router.post('/', async (req, res) => {
    const student = new StudentModel({
        sid: req.body.sid,
        name: req.body.name,
        batch: req.body.batch
    });

    try{
        const newStudent = await student.save();
        res.json(newStudent);
    } catch(error) {
        res.json(error);
    }
});

// update one
router.patch('/:id', getStudent, async (req, res) => {
    if(req.body.sid != null){
        res.student.sid = req.body.sid;
    }
    if(req.body.name != null){
        res.student.name = req.body.name;
    }
    if(req.body.batch != null){
        res.student.batch = req.body.batch;
    }
    try {
       const updatedStudent = await res.student.save();
       res.json(updatedStudent);
    } catch (error) {
        res.json(error);
    }
});

// delete one
router.delete('/:id', getStudent, async (req, res) => {
   try {
        await res.student.remove();
        res.json({
            "message": "Student deleted"
        });
   } catch (error) {
       res.json(error);
   }
});

async function getStudent(req, res, next){
    let student;
    try {
        student = await StudentModel.findById(req.params.id);
        if(student == null){
            res.json({
                "message": "Student not found"
            });
        }
    } catch (error) {
        res.json(error);
    }
    res.student = student;
    next();
}

module.exports = router;