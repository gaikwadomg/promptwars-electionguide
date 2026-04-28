import { useApp } from '../context/AppContext';
import { states, stateList } from '../data/states';

export default function StateSelector({ compact = false }) {
  const { selectedState, setSelectedState, language, t } = useApp();

  return (
    <div className={`state-selector ${compact ? 'compact' : ''}`}>
      {!compact && <label className="state-selector-label">{t('selectState')}</label>}
      <div className="state-selector-wrapper">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="state-selector-dropdown"
        >
          {stateList.map(state => (
            <option key={state.id} value={state.id}>
              {state.name[language]}
            </option>
          ))}
        </select>
        <span className="state-selector-arrow">▾</span>
      </div>
    </div>
  );
}
