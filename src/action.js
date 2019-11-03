import createAction from './common/createAction'

export const updateOpenKey = createAction('UPDATEOPENKEY','keys');
export const updateSelectKey = createAction('UPDATESELECTKEY','keys');
export const loginAdd = createAction('LOGINADD', 'info');
export const loginClear = createAction('LOGINCLEAR');
export const selfAdd = createAction('SELFADD', 'info');
export const selfClear = createAction('SELFCLEAR');
export const setActivity = createAction('SETACTIVITY','info');
export const clearActivity = createAction('CLEARACTIVITY');
export const addCities = createAction('ADDCITIES','info');