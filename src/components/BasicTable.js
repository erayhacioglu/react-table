import React, { useMemo } from 'react';
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from 'react-table';
import Data from './Data.json';
import { COLUMNS } from './columns';
import GlobalFilter from './GlobalFilter';

const BasicTable = () => {
	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => Data, []);

	const tableInstance = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		state,
		setGlobalFilter,
		page,
		nextPage,
		previousPage,
		canPreviousPage,
		canNextPage,
		pageOptions,
		gotoPage,
		pageCount,
		setPageSize,
	} = tableInstance;

	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-10 offset-md-1 py-3'>
					<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
					<div className='table-responsive'>
						<table
							{...getTableProps()}
							className='table table-striped table-bordered'
						>
							<thead className='table-dark text-center'>
								{headerGroups.map((headerGroup) => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map((column) => (
											<th
												{...column.getHeaderProps(
													column.getSortByToggleProps()
												)}
											>
												{column.render('Header')}
												<span>
													{column.isSorted
														? column.isSortedDesc
															? '🔽'
															: '🔼'
														: ''}
												</span>
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody
								{...getTableBodyProps()}
								className='table-hover text-center'
							>
								{page.map((row) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()}>
											{row.cells.map((cell) => (
												<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
											))}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div>
						<div className='d-flex justify-content-center align-items-center'>
							<span className='fs-6'>
								Page{' '}
								<strong>
									{pageIndex + 1} of {pageOptions.length}
								</strong>
							</span>

							<select
								value={pageSize}
								onChange={(e) => setPageSize(Number(e.target.value))}
								className='form-select ms-3'
								style={{ maxWidth: '200px' }}
							>
								{[2, 5, 10].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
						</div>
						<ul className='pagination justify-content-center'>
							<li className='page-item'>
								<button
									onClick={() => gotoPage(0)}
									disabled={!canPreviousPage}
									className='page-link'
								>
									{'<<'}
								</button>
							</li>
							<li className='page-item'>
								<button
									onClick={() => previousPage()}
									disabled={!canPreviousPage}
									className='page-link'
								>
									Previous
								</button>
							</li>
							<li className='page-item'>
								<button
									onClick={() => nextPage()}
									disabled={!canNextPage}
									className='page-link'
								>
									Next
								</button>
							</li>
							<li className='page-item'>
								<button
									onClick={() => gotoPage(pageCount - 1)}
									disabled={!canNextPage}
									className='page-link'
								>
									{'>>'}
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BasicTable;
