export default function Agreement() {
  return (
    <div>
      <button
        className="btn btn-warning mt-3"
        data-bs-toggle="collapse"
        data-bs-target="#demo"
      >
        Click to Start
      </button>
      <p></p>
      <div id="demo" className="collapse">
        <p>
          <i>
            As an administrator, I understand all responsibility for generating
            and uploading the .xls (.xlsx) file! I created the upload file like
            this:
            <br /> - the first column contains the names of the products.
            <br /> - the penultimate column contains the number of packages to
            be labeled.
            <br /> - the last column contains the end date of storage of
            products.
            <br /> I understand that after the formation of "Warranty
            Certificates", responsible employees will receive notifications
            about the expiration of the storage period for downloaded products.
            <br /> After the formation of the "Guarantee certificates" it is
            impossible to cancel or change the information!
          </i>
        </p>
        <p></p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="check1"
            name="option1"
            value="something"
            unchecked
          />
          <label className="form-check-label">
            <i>
              <b>Yes, I understand and did exactly that!</b>
            </i>
          </label>
          <p></p>
        </div>
      </div>
    </div>
  );
}
