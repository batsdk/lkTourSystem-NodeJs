const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name"],
    minLength: 2,
    maxLength: 100,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Must provide a valid email address"],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: [true, "Must provide a password"],
    minLength: 8,
    type: String,
  },
  accountType: {
    type: String,
    default: "user",
    enum: ["admin", "editor", "user"],
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.checkPassword = async function (bodyPassword) {
  const decodedPassword = await bcrypt.compare(bodyPassword, this.password);
  return decodedPassword;
};

module.exports = mongoose.model("User", UserSchema);
