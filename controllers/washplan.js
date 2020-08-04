const WashPlan = require('../models/washplan');
const HttpError = require('../models/http-error');

exports.addWashPlan = async (req, res, next) => {
  const { name, price, description } = req.body;
  const newWashPlan = new WashPlan({ name, price, description });
  try {
    await newWashPlan.save();
  } catch (err) {
    const error = new HttpError(
      'Adding Wash Plan failed, please try again later.',
      500
    );
    console.log(err);
    return next(error);
  }
  res.status(201).json({ washPlan: newWashPlan });
};

exports.getWashPlans = async (req, res, next) => {
  let washPlans;
  try {
    washPlans = await WashPlan.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching wash plans failed, please try again later.',
      500
    );
    console.log(err);
    return next(error);
  }
  res.json({
    washPlans: washPlans.map((washPlan) =>
      washPlan.toObject({ getters: true })
    ),
  });
};

exports.getWashPlanById = async (req, res, next) => {
  const washPlanId = req.params.wid;
  let washPlan;
  try {
    washPlan = await WashPlan.findById(washPlanId);
  } catch (err) {
    const error = new HttpError(
      'Fetching wash plan failed, please try again later.',
      500
    );
    console.log(err);
    return next(error);
  }
  if (!washPlan) {
    const error = new HttpError(
      'Could not find wash plan for provided ID.',
      404
    );
    return next(error);
  }
  res.json({ washPlan: washPlan.toObject({ getters: true }) });
};

exports.updateWashPlan = async (req, res, next) => {
  const { name, price, description } = req.body;
  const washPlanId = req.params.wid;

  let washPlan;
  try {
    console.log(washPlanId);
    washPlan = await WashPlan.findById(washPlanId);
    console.log(washPlan);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update wash plan.',
      500
    );
    console.log(err);
    return next(error);
  }

  if (!washPlan) {
    const error = new HttpError(
      'Could not find wash plan for provided ID.',
      404
    );
    return next(error);
  }

  washPlan.name = name;
  washPlan.price = price;
  washPlan.description = description;

  try {
    await washPlan.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update wash plan.',
      500
    );
    return next(eror);
  }

  res.json({ washPlan: washPlan.toObject({ getters: true }) });
};

exports.deleteWashPlan = async (req, res, next) => {
  const washPlanId = req.params.wid;

  let washPlan;
  try {
    washPlan = WashPlan.findById(washPlanId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete wash plan.',
      500
    );
    console.log(err);
    return next(error);
  }
  if (!washPlan) {
    const error = new HttpError(
      'Could not find wash plan by provided ID.',
      404
    );
    return next(error);
  }
  try {
    await washPlan.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete wash plan.',
      500
    );
    console.log(err);
    return next(error);
  }
  res.json({ message: 'Wash Plan deleted.' });
};
