import "@testing-library/jest-dom";
import { WebSocket } from 'mock-socket';

global.WebSocket = WebSocket; // Here we stub out the window object


