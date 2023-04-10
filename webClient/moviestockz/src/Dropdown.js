import languages from './language.json';
import years from './years.json';
import count from './count.json';
import store from './store';
import { setYear, setLanguage, setCount } from './action';


const Dropdown = () => {

  let selectedLanguage;
  const handleLanguageChange = (e) => {
    selectedLanguage = e?.target?.value !== undefined ? e.target.value : null;
  };

  let selectedYear;
  const handleYearChange = (e) => {
    selectedYear = e?.target?.value 
  };

  let selectedCount;
  const handleCountChange = (e) => {
    selectedCount = e?.target?.value 
  };

  const handleSearch = () => {
    console.log("clickkedddd",selectedLanguage,selectedYear,selectedCount);
    store.dispatch(setLanguage(selectedLanguage));
    store.dispatch(setYear(selectedYear));
    store.dispatch(setCount(selectedCount));
  };
  



  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <select
          id="language"
          name="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{
            width: '30%',
            height: '40px',
            borderRadius: '5px',
            padding: '5px'
          }}
        >
          <option value="">--Select Language--</option>
          {languages.map((language) => (
            <option key={language.value} value={language.value}>
              {language.label}
            </option>
          ))}
        </select>
        <select
          id="year"
          name="year"
          value={selectedYear}
          onChange={handleYearChange}
          style={{
            width: '30%',
            height: '40px',
            borderRadius: '5px',
            padding: '5px',
            marginLeft: '10px'
          }}
        >
          <option value="">--Select Year--</option>
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
        <select
          id="count"
          name="count"
          value={selectedCount}
          onChange={handleCountChange}
          style={{
            width: '30%',
            height: '40px',
            borderRadius: '5px',
            padding: '5px',
            marginLeft: '10px'
          }}
        >
          <option value="">--Select Count--</option>
          {count.map((count) => (
            <option key={count.value} value={count.value}>
              {count.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ position: 'fixed', top: '0', right: '0'}}>
        <button onClick={handleSearch} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', borderRadius: '5px' }}>Search</button>
    </div>
    </>
  );
};

export default Dropdown;
