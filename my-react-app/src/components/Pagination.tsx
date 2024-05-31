import { useEffect, useState, ReactElement } from "react";

interface Props {
  perPage: number;
  length: number;
  currentPageToParent:any;
}

const Pagination = (Props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [buttons, setButtons] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    let currentButtons:any = [];
    const newPages = Math.ceil(Props.length / Props.perPage);
    if(newPages<Props.length){
        setPages(newPages);
        for (let i = 1; i <= newPages; i++) {
                currentButtons.push(i);
              }
    }
          setButtons(currentButtons);


  }, [Props.length, Props.perPage]);

  const handlePaginationClick = (e: any) => {
    let value = parseInt(e.target.value);
    if (e.target.value == "Next" && currentPage < pages) {
        setCurrentPage(currentPage + 1);
    }
    else if (e.target.value == "Prev" && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
    else if(!isNaN(value)) {
      setCurrentPage(value);
    }
  };

  useEffect(() => {
    console.log(currentPage, "<----");
    Props.currentPageToParent(currentPage);
  }, [currentPage]);



  return (
    <div>
       
      <button onClick={handlePaginationClick} value="Prev">
        Prev
      </button>
      {buttons.map((button: number) => {
        return (
          <button onClick={handlePaginationClick} value={button} key={button}>
            {button}
          </button>
        );
      })}
      <button onClick={handlePaginationClick} value="Next">
        Next
      </button>
    </div>
  );
};

export default Pagination;
