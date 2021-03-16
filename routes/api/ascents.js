const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Ascent = require('../../models/Ascent');

// @route    POST api/ascents/
// @desc     Log an ascent
// @access   Private
router.post(
  '/',
  auth,
  check('name', 'Name is required').notEmpty(),
  check('grade', 'Grade is required').notEmpty(),
  check('date', 'Date is required').notEmpty(),
  check('rating', 'Rating is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newAscent = await new Ascent({
        user: req.user.id,
        area: req.body.area._id,
        rating: req.body.rating,
        name: req.body.name,
        grade: req.body.grade,
        date: req.body.date,
        flash: req.body.flash,
        fa: req.body.fa,
        youtube: req.body.youtube,
        instagram: req.body.instagram,
      });

      const ascent = await newAscent.save();
      user.ascents.unshift(ascent);
      await user.save();
      const ascents = await Ascent.find({ user: req.user.id }).populate('area');
      res.json(ascents);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PATCH api/ascents
// @desc     Update an ascent
// @access   Private
router.patch(
  '/',
  auth,
  check('name', 'Name is required').notEmpty(),
  check('grade', 'Grade is required').notEmpty(),
  check('date', 'Date is required').notEmpty(),
  check('rating', 'Rating is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const filter = { user: req.user.id, _id: req.body._id };
    const update = {
      rating: req.body.rating,
      area: req.body.area._id,
      name: req.body.name,
      grade: req.body.grade,
      date: req.body.date,
      flash: req.body.flash,
      fa: req.body.fa,
      youtube: req.body.youtube,
      instagram: req.body.instagram,
    };

    try {
      let updatedAscent = await Ascent.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.json(updatedAscent);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/ascents/:area_id
// @desc     Get problems by area id
// @access   Public
router.get('/:area_id', async (req, res) => {
  try {
    const problems = await Ascent.find({ area: req.params.area_id });
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/ascents/user/:user_id
// @desc     Get ascents by user id
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const ascents = await Ascent.find({ user: req.params.user_id }).populate(
      'area'
    );
    res.json(ascents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/ascents/:ascent_id
// @desc     Delete ascent
// @access   Private
router.delete('/:ascent_id', auth, async (req, res) => {
  try {
    const ascent = await Ascent.findById(req.params.ascent_id);

    if (!ascent) {
      return res.status(404).json({ msg: 'Ascent not found' });
    }

    if (ascent.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await ascent.remove();

    res.json({ msg: 'ascent removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
