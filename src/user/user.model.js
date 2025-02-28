import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    apellidos: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      maxLength: [50, "El apellido no puede tener más de 50 caracteres"],
    },
    userName: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      maxLength: [
        50,
        "El nombre de usuario no puede tener más de 50 caracteres",
      ],
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    adminPicture: {
      type: String,
    },
    phone: {
      type: String,
      minLength: 8,
      maxLength: 8,
      required: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    role: {
      type: String,
      required: true,
      default: "ADMIN",
      enum: ["ADMIN"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.toJSON = function () {
  const { password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default model("User", userSchema);