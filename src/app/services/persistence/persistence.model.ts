export interface Cacheable<T> {
  location: CacheableLocation,
  key: string,
  params: any,
  size: number,
  progress: number,
  object: T
}

export enum CacheableLocation {
  SERVER="SERVER",
  FETCHING="FETCHING",
  CACHED="CACHED"
}

export enum FetchStrategy {
  EAGER=1,
  LAZY=2,
  HESITANT=3,
  SNEAKY=4
}

export enum ObjectType {
  NULL="Null",
  CONTENT="Content",
  ASSETPACKAGE="AssetPackage",
  ASSET="Asset"
}

export interface User {
  id: string;
  locale: string;
  username: string;
}

export interface Content {
  id: string;
  languages: ContentLanguage[];
  contents: any[];
}

export interface ContentLanguage {
  id: string;
  locale: string;
  logline: string;
  synopsis: string;
  released: boolean;
  display: boolean;
  price?: number;
  offerPrice?: number;
  releaseDate: Date;
  payload?: Cacheable<AssetPackage>;
  collateral?: Cacheable<AssetPackage>;
  sample?: Cacheable<AssetPackage>;
  actions?: Action[];
}

export class AssetPackage {
  id: string;
  kB: number;
  feedbackSubmitted: boolean;
  assets: Asset[];
}

export class Comic extends AssetPackage {
  viewports: Viewport[];
  index: string;
}

export interface Asset {
  id: string;
  uri: string;
}

export interface Image extends Asset {
  kB: number;
  height: number;
  width: number;
}

export interface Action {
  name: string;
  type: string;
  link: string;
  icon: string;
}

export interface Viewport {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  image: string;
  up: number;
  down: number;
  previous: number;
  next: number;
}
