import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utcTime from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(utcTime);

export default dayjs;
