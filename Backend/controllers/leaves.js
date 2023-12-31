import { addHolidaysModal, addLeavesModel, getHolidaysModel, getLeavesModel, getLeavesUserBasedModel } from "../models/leavesModel.js";
import { getUserIdModel } from "../models/usersModel.js";

export const addLeavesUserBased = async(req, res) => {
    try {
        console.log('workinggggggg......');
        if (!req.loggedUserEmail) {
            return res.sendStatus(401);
        }
        const email = req.body.email;
        const leavesInfo = {
            casual_leave: parseInt(req.body.casualLeave),
            sick_leave: parseInt(req.body.sickLeave),
            privileged_leave: parseInt(req.body.privilegedLeave),
            parental_leave: parseInt(req.body.parentalLeave),
            maternity_leave: parseInt(req.body.maternityLeave),
        };
        console.log(leavesInfo);
        const userIds = await getUserIdModel(email);
        await addLeavesModel(leavesInfo, userIds[0].userID);
        res.send({success: true, msg: 'Added leaves successfully'});
    } catch(err) {
        console.error(err);
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
};

export const getLeaves = async(req, res) => {
    try {
        if (!req.loggedUserEmail) {
            return res.sendStatus(401);
        }
        const leaves = await getLeavesModel();
        res.send(leaves);
    } catch (err) {
        console.error(err);
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
};

export const getLeavesUserBased = async(req, res) => {
    try {
        if (!req.loggedUserEmail) {
            return res.sendStatus(401);
        }
        const email = req.params.email;
        const leaves = await getLeavesUserBasedModel(email);
        res.send(leaves);
    } catch(err) {
        console.error(err);
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
};

export const addHolidays = async(req, res) => {
    try {
        if (!req.loggedUserEmail) {
            return res.sendStatus(401);
        }
        const holidays = req.body;
        await addHolidaysModal(holidays);
        res.send({success: true, msg: 'Added holidays successfully'});
    } catch(err) {
        console.log(err);
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
};

export const getHolidays = async(req, res) => {
    try {
        if (!req.loggedUserEmail) {
            return res.sendStatus(401);
        }
        const respose = await getHolidaysModel();
        res.send(respose);
    } catch(err) {
        console.log(err);
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
};