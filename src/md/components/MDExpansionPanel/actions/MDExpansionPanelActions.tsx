import { IAction } from '../interfaces';

const namespace = 'MD_EXPANSION_PANEL';

export const ADD_PANEL = `${namespace}_ADD`;
export const SUBMIT_PANEL = `${namespace}_SUBMIT`;
export const CANCEL_PANEL = `${namespace}_CANCEL`;
export const OPEN_PANEL = `${namespace}_OPEN`;
export const CLOSE_PANEL = `${namespace}_CLOSE`;

export function addPanel(id: string, value?: any): IAction {
  return { type: ADD_PANEL, value, id };
}

export function submitPanel(id: string, value?: any): IAction {
  return { type: SUBMIT_PANEL, value, id };
}

export function cancelPanel(id: string, value?: any): IAction {
  return { type: CANCEL_PANEL, value, id};
}

export function openPanel(id: string, value?: any): IAction {
  return { type: OPEN_PANEL, value, id};
}

export function closePanel(id: string, value?: any): IAction {
  return { type: CLOSE_PANEL, value, id};
}
