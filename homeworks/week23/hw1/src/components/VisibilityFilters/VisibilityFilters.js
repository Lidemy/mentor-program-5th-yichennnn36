import { useDispatch, useSelector } from 'react-redux';
import { FilterButtonBlock, ModeFilterButton, TheClearAllButton } from './VisibilityFiltersStyle';
import { setFilter, clearAllCompleted } from '../../redux/actions';
import { VISIBILITY_FILTERS } from '../../constants/constants';
import { selectFilters } from '../../redux/selectors';

const VisibilityFilters = () => {
  const dispatch = useDispatch();
  const filterState = useSelector(selectFilters);

  return (
    <FilterButtonBlock>
      <ModeFilterButton>
        {
          Object.keys(VISIBILITY_FILTERS)
            .map(filterKey => {
              const currentFilter = VISIBILITY_FILTERS[filterKey];

              return (
                <button
                  key={`visibility-filter-${currentFilter}`}
                  className={currentFilter === filterState ? 'active' : currentFilter}
                  onClick={() => dispatch(setFilter(currentFilter))}
                >
                  {currentFilter}
                </button>
              )
            }
            )
        }
      </ModeFilterButton>
      <TheClearAllButton>
        <button onClick={() => dispatch(clearAllCompleted())}>clear completed</button>
      </TheClearAllButton>
    </FilterButtonBlock>
  )
};

export default VisibilityFilters;