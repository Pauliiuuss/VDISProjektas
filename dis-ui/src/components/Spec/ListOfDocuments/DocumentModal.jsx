import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { LINK } from '../../../services/LINK';
import { Button, Modal } from 'react-bootstrap';

const API_URL = LINK + '/api/documents/';

export default function DocumentModal({ id, showModal }) {
  const [show, setShow] = useState(showModal);

  const handleClose = () => setShow(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <React.Fragment>
      <Modal
        className="modalDocuments"
        show={show}
        onHide={handleClose}
        animation={false}
        size="lg"
        centered
        keyboard
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-secondary">
            Dokumento peržiūra
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Document
            file={API_URL + `doc/${id}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <p className="text-secondary">
              Puslapis {pageNumber || (numPages ? 1 : '--')} of{' '}
              {numPages || '--'}
            </p>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Ankstesnis
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Sekantis
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Uždaryti
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
