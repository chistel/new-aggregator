import {format, parseISO} from 'date-fns';

export const formattedDate = (date: string): string => {
   const d = new Date(date);
   const year = d.getFullYear();
   const month = String(d.getMonth() + 1).padStart(2, '0');
   const day = String(d.getDate()).padStart(2, '0');

   return `${year}-${month}-${day}`
}

export const formatToDateTime = (timeString: string): string => {
   try {
      const date = parseISO(timeString);
      return format(date, "yyyy-MM-dd h:mm a");
   } catch (error) {
      throw new Error("Invalid time string");
   }
};

export const defaultSearchDate = (): { monthAgoDate: string; currentDate: string } => {
   const d = new Date();
   const year = d.getFullYear();
   const month = d.getMonth(); // Zero-indexed month
   const day = d.getDate().toString().padStart(2, '0');

   const previousMonth = month === 0 ? 11 : month - 1;
   const previousYear = month === 0 ? year - 1 : year;
   const monthAgoDate = `${previousYear}-${(previousMonth + 1).toString().padStart(2, '0')}-${day}`;

   const currentDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day}`;

   return {monthAgoDate, currentDate};
};
