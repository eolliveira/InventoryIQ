import './style.css';
import ArrowImgLeft from '@mui/icons-material/ExpandMore';
import ReactPaginate from 'react-paginate';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

type Props = {
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
};

const Pagination = ({ pageCount, range, onChange }: Props) => {
  return (
    <>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={range}
        marginPagesDisplayed={1}
        //estilo do container do componente
        containerClassName="pagination-container"
        //estilo dos itens
        pageLinkClassName="pagination-item page-item"
        //estilo do '...'
        //breakClassName="pagination-item"
        previousLabel={<ArrowLeftIcon />}
        //define estilo e componente para o next
        nextLabel={<ArrowLeftIcon />}
        nextClassName="arrow-inverse"
        activeLinkClassName="arrow-active"
        disabledClassName="arrow-inactive"
        disabledLinkClassName='arrow-inactive'
        onPageChange={(items) => (onChange) ? onChange(items.selected) : {}}
      />
      

      {/* <div className="pagination-container">
      <ArrowImgLeft className="arrow-active" />
      <div className="pagination-item active">1</div>
      <div className="pagination-item">2</div>
      <div className="pagination-item">3</div>
      <div className="pagination-item">3</div>
      <div className="pagination-item">...</div>
      <ArrowImgLeft className="arrow-inverse arrow-inactive" />
    </div> */}
    </>
  );
};

export default Pagination;
