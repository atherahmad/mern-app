import identifierModel from "../models/identifierModel.js";

export const getIdentifier = async (req, res) => {
  try {
    const result = await identifierModel.find().populate("user", "-password");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const createIdentifier = async (req, res) => {
  try {
    const newIdentifier = new identifierModel(req.body);
    await newIdentifier.save();
    res.status(201).json(newIdentifier);
  } catch (error) {
    console.log(error);
  }
};
