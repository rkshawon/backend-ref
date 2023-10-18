import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import IUsers from "../interface/users.interface";

const permissionsSchema = {
  dashboard: {
    access: {
      type: Boolean,
      default: false,
    },
  },
  marketplace: {
    access: {
      type: Boolean,
      default: false,
    },
  },
  inventory: {
    access: {
      type: Boolean,
      default: false,
    },
  },
  orders: {
    access: {
      type: Boolean,
      default: false,
    },
  },
  transports: {
    access: {
      type: Boolean,
      default: false,
    },
  },
  auctions: {
    access: {
      type: Boolean,
      default: false,
    },
  },
  settings: {
    access: {
      type: Boolean,
      default: true,
    },
  },
  transaction: {
    access: {
      type: Boolean,
      default: false,
    },
  },
  trips: {
    access: {
      type: Boolean,
      default: false,
    },
  },
  users: {
    access: {
      type: Boolean,
      default: false,
    },
  },
  events: {
    access: {
      type: Boolean,
      default: false,
    },
  },
};

const UserSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    profile_pic: { type: String, default: "" },
    companies: [
      {
        info: { type: Schema.Types.ObjectId, ref: "companies" },
        access: {
          type: Boolean,
          default: false,
        },
        permissions: permissionsSchema,
      },
    ],
    password: { type: String },
    phone_number: String,

    driver: {
      license_number: {
        type: String,
      },
      occupational_license_number: {
        type: String,
      },
      phone_number: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "member", "driver"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "pending",
    },

    is_deleted: { type: Boolean, default: false },
    created_by: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUsers>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUsers>("users", UserSchema);
