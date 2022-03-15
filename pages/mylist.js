import MainLayout from '../components/mainlayout';
import MyListComponent from '../components/myListComponent';
import { useStateContext } from '../components/Provider';

export default function MyList(props){
  return (
      <MainLayout>
        <div style={{ padding: '35px 0'}}>
            <MyListComponent/>
        </div>
      </MainLayout>
  
  );
};