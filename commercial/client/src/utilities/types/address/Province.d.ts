type NestedDivisions = {
  name: string;
  code: number;
  codename: string;
  division_type: NestedDivisionDivisionType;
  phone_code: number;
  districts: District[];
};

type Ward = {
  name: string;
  code: number;
  codename: string;
  division_type: DistrictDivisionType;
  short_codename: string;
};

type District = {
  name: string;
  code: number;
  codename: string;
  division_type: DistrictDivisionType;
  short_codename: string;
  wards?: Ward[];
};

export enum DistrictDivisionType {
  District = 'huyện',
  Ward = 'phường',
  District = 'quận',
  City = 'thành phố',
  Town = 'thị trấn',
  Township = 'thị xã',
  Commune = 'xã',
}

export enum NestedDivisionDivisionType {
  CentralCity = 'thành phố trung ương',
  Province = 'tỉnh',
}
