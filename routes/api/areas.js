const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Area = require('../../models/Area');

// @route    POST api/areas
// @desc     Create new area
// @access   Private
router.post(
  '/',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('location', 'Location is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newArea = new Area({
        title: req.body.title,
        location: req.body.location,
        creator: req.user.id,
      });

      const area = await newArea.save();

      res.json(area);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/area/:area_id
// @desc     Delete area
// @access   Private
router.delete('/:area_id', auth, async (req, res) => {
  try {
    const area = await Area.findById(req.params.area_id);

    if (!area) {
      return res.status(404).json({ msg: 'Area not found' });
    }

    if (area.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await area.remove();

    res.json({ msg: 'ascent removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
