import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import config from 'config';

const app=express();
app.use(express.json());
