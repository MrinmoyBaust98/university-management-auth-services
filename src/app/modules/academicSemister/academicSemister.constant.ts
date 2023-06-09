import {
  IAcademicSemisterCode,
  IAcademicSemisterMonth,
  IAcademicSemisterTitle,
} from './academicSemister.interface';

export const academicSemisterTitle: IAcademicSemisterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemisterCode: IAcademicSemisterCode[] = ['01', '02', '03'];

export const academicSemisterMonth: IAcademicSemisterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemisterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemisterSearchField = ['title', 'code', 'year'];

export const academicSemisterFilterableField = [
  'searchTerm',
  'title',
  'code',
  'year',
];
