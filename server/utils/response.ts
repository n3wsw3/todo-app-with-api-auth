import { ServerResponse } from "http";
import { send } from "h3";
import { StatusCodes } from "http-status-codes";
import { MediaTypes } from "./mediaTypes";

export const sendJsonResponse = (
  res: ServerResponse,
  data: any,
  statusCode: number
) => {
  sendResponse(res, statusCode, data, MediaTypes.JSON);
};

export const createErrorResponse = (error: any) => ({ error });
export const createMessageResponse = (message: any) => ({ message });

export const sendResponse = (
  res: ServerResponse,
  statusCode: StatusCodes,
  data: any,
  mediaType: MediaTypes
) => {
  res.writeHead(statusCode, { "Content-Type": mediaType });
  res.end(JSON.stringify(data));
};

export const sendErrorResponse = (
  res: ServerResponse,
  error: any,
  statusCode: StatusCodes
) => {
  sendResponse(res, statusCode, createErrorResponse(error), MediaTypes.JSON);
};

export const sendMessageResponse = (
  res: ServerResponse,
  msg: any,
  statusCode: StatusCodes
) => {
  sendResponse(res, statusCode, createMessageResponse(msg), MediaTypes.JSON);
};
