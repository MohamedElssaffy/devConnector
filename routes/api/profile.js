const router = require('express').Router();
const axios = require('axios');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middelware/auth.js');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route GET
// @desc Get all profiles Route
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route GET
// @desc Get profile by user ID Route
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
    const profile = await Profile.findOne({ user: userId }).populate('user', [
      'name',
      'avatar',
    ]);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);

    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.status(500).send('Server Error');
  }
});

// @route GET
// @desc My profile Route
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route POST
// @desc Create or update profile
// @access Private
router.post(
  '/',
  [
    auth,
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      skills,
      githubusername,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    console.log(skills);

    const profileFields = {};

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills)
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    if (githubusername) profileFields.githubusername = githubusername;

    profileFields.social = {};

    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE
// @desc Delete profile, user & posts Route
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove(req.user.id);

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route PATCH
// @desc Add experience
// @access Private
router.patch(
  '/experience',
  [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE
// @desc Remove experience
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removedExpIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    if (removedExpIndex === -1) {
      return res.status(400).send('There is no Experience');
    }

    profile.experience.splice(removedExpIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err);

    res.status(500).send('Server Error');
  }
});

// @route PATCH
// @desc Add education
// @access Private
router.patch(
  '/education',
  [
    auth,
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE
// @desc Remove education
// @access Private
router.delete('/education/:edc_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    console.log(profile);
    const removedEdcIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edc_id);

    if (removedEdcIndex === -1) {
      return res.status(400).send('There is no education');
    }

    profile.education.splice(removedEdcIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err);

    res.status(500).send('Server Error');
  }
});

// @route GET
// @desc Get github repos
// @access Public
router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );

    const headers = {
      'user-agent': `node.js`,
      Authorization: `token ${
        process.env.acc_token || config.get('acc_token')
      }`,
    };

    const githubdrequest = await axios(uri, headers);
    res.json(githubdrequest.data);
  } catch (err) {
    console.error(err);
    res.status(404).json({ msg: 'No Github profile found' });
  }
});

module.exports = router;
