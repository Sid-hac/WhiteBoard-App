"use client"
import { io } from "socket.io-client";

// const URL = process.env.NODE_ENV === "production" ? 'https://whiteboard-app-server.onrender.com' : 'http://localhost:5000'

const URL = "https://whiteboard-app-server.onrender.com"

export const socket = io(URL);