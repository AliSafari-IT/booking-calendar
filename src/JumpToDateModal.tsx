import { useState, useEffect, useRef } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isToday } from 'date-fns';

interface JumpToDateModalProps {
  isOpen: boolean;
  currentDate: Date;
  onClose: () => void;
  onSelect: (date: Date) => void;
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function JumpToDateModal({ isOpen, currentDate, onClose, onSelect }: JumpToDateModalProps) {
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const yearInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setYear(currentDate.getFullYear());
      setMonth(currentDate.getMonth());
      setTimeout(() => yearInputRef.current?.focus(), 0);
    }
  }, [isOpen, currentDate]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1900 && val <= 2100) {
      setYear(val);
    }
  };

  const handleYearIncrement = () => {
    if (year < 2100) setYear(year + 1);
  };

  const handleYearDecrement = () => {
    if (year > 1900) setYear(year - 1);
  };

  const handleMonthSelect = (m: number) => {
    setMonth(m);
  };

  const handleDaySelect = (date: Date) => {
    onSelect(date);
    onClose();
  };

  const generateCalendarDays = () => {
    const targetDate = new Date(year, month, 1);
    const monthStart = startOfMonth(targetDate);
    const monthEnd = endOfMonth(targetDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days: Date[] = [];
    let day = calendarStart;
    while (day <= calendarEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  if (!isOpen) return null;

  const calendarDays = generateCalendarDays();

  return (
    <div className="bc-modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="bc-modal bc-jump-modal">
        <div className="bc-modal-header">
          <h3>Jump to Date</h3>
          <button className="bc-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="bc-modal-body">
          <div className="bc-jump-year-row">
            <button className="bc-jump-year-btn" onClick={handleYearDecrement} aria-label="Previous year">
              −
            </button>
            <input
              ref={yearInputRef}
              type="number"
              className="bc-jump-year-input"
              value={year}
              onChange={handleYearChange}
              min={1900}
              max={2100}
              aria-label="Year"
            />
            <button className="bc-jump-year-btn" onClick={handleYearIncrement} aria-label="Next year">
              +
            </button>
          </div>

          <div className="bc-jump-month-grid">
            {MONTHS.map((m, idx) => (
              <button
                key={m}
                className={`bc-jump-month-btn ${month === idx ? 'bc-jump-selected' : ''}`}
                onClick={() => handleMonthSelect(idx)}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="bc-jump-calendar">
            <div className="bc-jump-weekdays">
              {WEEKDAYS.map(wd => (
                <div key={wd} className="bc-jump-weekday">{wd}</div>
              ))}
            </div>
            <div className="bc-jump-days">
              {calendarDays.map((day, idx) => {
                const targetDate = new Date(year, month, 1);
                const isCurrentMonth = isSameMonth(day, targetDate);
                const isSelected = isSameDay(day, currentDate);
                const isTodayDay = isToday(day);

                return (
                  <button
                    key={idx}
                    className={`bc-jump-day ${!isCurrentMonth ? 'bc-jump-day-muted' : ''} ${isSelected ? 'bc-jump-day-selected' : ''} ${isTodayDay ? 'bc-jump-day-today' : ''}`}
                    onClick={() => handleDaySelect(day)}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
