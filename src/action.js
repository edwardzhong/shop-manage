import createAction from './common/createAction'

export const loginAdd = createAction('LOGINADD', 'info');
export const loginClear = createAction('LOGINCLEAR');
export const selfAdd = createAction('SELFADD', 'info');
export const selfClear = createAction('SELFCLEAR');
export const selfUpdate = createAction('SELFUPDATE', 'info');

export const updateOpenKey = createAction('UPDATEOPENKEY','keys');
export const updateSelectKey = createAction('UPDATESELECTKEY','keys');