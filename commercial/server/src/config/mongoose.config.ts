/**
 * @ Author: David Nguyễn
 * @ Email: davidnguyen67dev@gmail.com
 * @ Create Time: 2024-06-16 17:35:38
 * @ Modified by: David Nguyễn
 * @ Modified time: 2024-06-16 18:29:15
 * @ Description:
 */

import 'dotenv/config';
import mongoose from 'mongoose';

const mongooseConfig: { uri: string; options?: mongoose.ConnectOptions } = {
  uri: process.env.NEST_PRIVATE_MONGODB_ATLAS_DATABASE_URL,
  options: {},
};

export default mongooseConfig;
