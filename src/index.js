import './scss/index.scss'
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {CreateStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {storage} from '@core/util';

const store = new CreateStore(rootReducer, storage('excel-state'))
store.subscribe((state) => {
  storage('excel-state', state)
  console.log('APP STATE', state)
})
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})
excel.render();
