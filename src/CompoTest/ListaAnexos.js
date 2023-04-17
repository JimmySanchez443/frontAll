import React from 'react';
import { faCheckCircle, faEdit, faTrash, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListaAnexos = ({ anexos }) => {

	return (
		<>
			<h3 className="mb-3"> Lista de anexos</h3>
			{
				anexos.map(anexo =>
					<div className="mb-3  border rounded p-3" key={anexo.id} >
					
						<div className="d-flex justify-content-between mb-1">
							<div className="fw-bold">{anexo.id}</div>
							<div className='text-muted small'>
								<FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
								<FontAwesomeIcon icon={faTrash} className="cursor-pointer ms-2" />
							</div>
						</div>


						<div>
							{
								anexo.sa_porcentaje ?
									<div className='text-success small'>
										<FontAwesomeIcon icon={faCheckCircle} />{""}
										Completado
									</div>
									:
									<div className='text-secondary small'>
										<FontAwesomeIcon icon={faClock} />{""}
										Pendiente
									</div>
							}

						</div>

					</div>

				)
			}
		</>
	);
}


export default ListaAnexos;