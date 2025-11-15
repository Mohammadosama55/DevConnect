const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // User Fields
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    username:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    firstName:    { type: String, required: true, trim: true },
    lastName:     { type: String, required: true, trim: true },
    password:     { type: String, required: true },
    role:         { type: String, enum: ['user', 'moderator', 'admin', 'owner'], default: 'user' },
    refreshToken: { type: String, default: null },

    // Profile fields
    bio:          { type: String, default: '', maxlength: 500 },
    location:     { type: String, default: '' },
    skills:       { type: [String], default: [] },
    avatar:       { type: String, default: '' },
    website:      { type: String, default: '' },
    github:       { type: String, default: '' },
    linkedin:     { type: String, default: '' },
    otherWebsite: { type: String, default: '' },
    isActive:     { type: Boolean, default: true },
    lastLogin:    { type: Date, default: null },
  },
  { timestamps: true }
);

/* ----------  Indexes  ---------- */
/*  unique: true  already creates the index for email and username
    so we MUST NOT call .index() again for those fields               */
userSchema.index({ role: 1 });        // ok – no conflict
userSchema.index({ createdAt: -1 });  // ok – no conflict

module.exports = mongoose.model('User', userSchema);