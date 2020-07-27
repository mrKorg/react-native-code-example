import {combineEpics} from 'redux-observable';
import {catchError} from 'rxjs/operators';

import appEpic from 'store/epics/app';
import authEpic from 'store/epics/auth';
import globalEpic from 'store/epics/global';
import cartEpic from 'store/epics/cart';

const epics = [appEpic, authEpic, globalEpic, cartEpic];

const rootEpic = (action$, store$, dependencies) =>
  combineEpics(...epics)(action$, store$, dependencies).pipe(catchError((error, source) => source));

export default rootEpic;
