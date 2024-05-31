
import './App.css';
import { useEffect, useState } from 'react';
import data from './components/data';
import Pagination from './components/Pagination';


function App() {

console.log(data);
const [currentPage, setCurrentPage] = useState(1);  
const [perPage, setPerPage] = useState(5);
const [currentData, setCurrentData] = useState(data);   

const handleCurrentPage = (page:number)=>{
  setCurrentPage(page)
}



useEffect(() => {
  setCurrentData(()=>{
    let start = 0;
    let end = perPage;
    if(currentPage>1){
      start = (currentPage-1)*perPage;
      end = currentPage*perPage;
    }else{
      start = 0;
      end = perPage;
    }

   return data.slice(start,end)
  })


}, [currentPage,perPage])



  return (
    <div className="App">
      <div>
        How many records you want to show per page 
        <input type='text' value={perPage} onChange={(e:any)=>setPerPage(e.target.value)}/>
      </div>
      <table border={2}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination perPage={perPage} length={data.length} currentPageToParent={handleCurrentPage}    />
    </div>

  );
}

export default App;
