const Complaint = require("../models/Complaint");


const router = require("express").Router();

//CREATE

router.post("/",  async (req, res) => {
    const newComplaint = new Complaint(req.body);

    try {
        const savedComplaint = await newComplaint.save();
        res.status(200).json(savedComplaint);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id",  async (req, res) => {
    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedComplaint);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id",  async (req, res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id);
        res.status(200).json("Complaint has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});


// //GET ALL

router.get("/",  async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
