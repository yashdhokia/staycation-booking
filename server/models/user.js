import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      required: "email is required",
      unique: true,
    },
    password: {
      type: String,
      required: "password is required",
      min: 6,
      max: 64,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true }
);

//middleware
userSchema.pre("save", function (next) {
  let user = this;
  //hash password
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log("BCRYPT HASH ERR", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log("COMPARE PASSWORD ERR", err);
      return next(err, false);
    }
    // if no err, we get null
    console.log("MATCH PASSWORD", match);
    return next(null, match); //true
  });
};

export default mongoose.model("User", userSchema);
