import { Observable } from 'rxjs';

export enum PagePosition {
  left = "LEFT",
  right = "RIGHT"
}

export enum MatsukazeObjectTypes {
  story = "Story",
  act = "Act",
  sceneSequence = "SceneSequence",
  scene = "Scene",
  beat = "Beat",
  momentSequence = "MomentSequence",
  moment = "Moment",
  dialogueLine = "DialogueLine",
  publication = "Publication",
  page = "Page",
  i18nBundleElement = "I18nBundleElement",
  i18nBundle = "I18nBundle",
  language = "Language",
  role = "Role",
  user = "User",
  project = "Project",
  error = "Error"
}

export enum LetteringTypes {
  caption = "CAPTION",
  speech = "SPEAKING",
  whisper = "WHISPERING",
  thought = "THINKING",
  shout = "SHOUTING",
  continued = "...CONTINUED",
  soundEffect = "SOUND EFFECTS",
  music = "MUSIC"
}

// MatsukazeObject DEFINITION---------------------------------------------------------------

export class MatsukazeObject {
  id: number = null;
  matsukazeObjectType: MatsukazeObjectTypes;

  constructor(params: any) {
    this.id = params.id;
    this.matsukazeObjectType = null;
  }

  toPOJO(): any {
    var json: any = {};
    for(let key in this) {
      if(typeof this[key]!="object") json[key] = this[key];
    }
    return json;
  }

  getType(): MatsukazeObjectTypes { return null; }
}

// BASE CLASSES ----------------------------------------------------------------

export interface Positioned {
  id: number;
  position: number;
  matsukazeObjectType: MatsukazeObjectTypes;
}

export class Project extends MatsukazeObject {
  id: number;
  title: string;
  team: Array<string>;
  stories: Story[];
  publications: Publication[];
  languages: Language[];

  constructor(params: any) { super(params); }

  getType(): MatsukazeObjectTypes { return MatsukazeObjectTypes.project; }
}

export class User extends MatsukazeObject {
  id: number;
  email: string;
  token: string;
  roles: Role[] = [];

  constructor(params: any) {
    super(params);
    this.email = params?.email;
    this.token = params?.token;
    for(let role of params?.roles) { this.roles.push(new Role(role)); }
    this.matsukazeObjectType = MatsukazeObjectTypes.user;
  }

  getType(): MatsukazeObjectTypes { return MatsukazeObjectTypes.user; }
}

export class Role extends MatsukazeObject {
  name: string;

  constructor(params: any) {
    super(params);
    this.name = params?.name;
    this.matsukazeObjectType = MatsukazeObjectTypes.role;
  }

  getType(): MatsukazeObjectTypes { return MatsukazeObjectTypes.role; }
}

export class Language extends MatsukazeObject {
  id: number;
  locale: string;
  name: string;

  constructor(params: any) { super(params); }

  getType(): MatsukazeObjectTypes { return MatsukazeObjectTypes.language; }
}

export class I18nBundle extends MatsukazeObject {
  id: number;
  i18nBundleElements: {[language: string]: I18nBundleElement} = {};
  matsukazeObjectType = MatsukazeObjectTypes.i18nBundle

  constructor(params: any) {
    super(params);
    this.id = params.id;
    for(let key in params.i18nBundleElements) {
      this.i18nBundleElements[String(key)] = new I18nBundleElement(params.i18nBundleElements[key]);
    }
  }

  getText(language: string): string {
    if(this?.i18nBundleElements[language]) return this.i18nBundleElements[language].text; else return null;
  }
}

export class I18nBundleElement extends MatsukazeObject {
  id: number;
  language: Language;
  text: string;
  matsukazeObjectType = MatsukazeObjectTypes.i18nBundleElement

  constructor(params: any) {
    super(params);
    this.id = params.id;
    this.language = params.language;
    this.text = params.text;
  }

}

export class Publication extends MatsukazeObject implements Positioned {
  id: number;
  position: number;
  projectId: number;
  publicationLanguages: {
    [key: string]: PublicationLanguage;
  };

  constructor(params: any) { super(params); }
}

export class PublicationLanguage extends MatsukazeObject {
  id: number;
  publicationId: number;
  assetPackageId: number;
  language: Language;
  title: string;

  constructor(params: any) {
    super(params);
    this.id = params.id;
    this.publicationId = params.publicationId;
    this.language = params.language;
    this.title = params.title;
  }
}

export class AssetPackage extends MatsukazeObject {
  id: number;

  constructor(params: any) {
    super(params);
    this.id = params.id;
  }
}

export class MatsukazeError extends MatsukazeObject {
  id: number;
  type: string;
  data: string;
  matsukazeObjectType: MatsukazeObjectTypes = MatsukazeObjectTypes.error;

  constructor(params: any) {
    super(params);
    this.id = params.id;
    this.type = params.type;
    this.data = params?.data;
  }
}

// STORY STRUCTURE ELEMENTS ----------------------------------------------------

export interface StoryNode extends StoryStructureElement {
  children$: Observable<StoryStructureElement[]>;
  children: StoryStructureElement[];
}

export let MatsukazeStoryStructureElementTypes = {
  [MatsukazeObjectTypes.story]: {label: "Story", hierarchy: 1},
  [MatsukazeObjectTypes.act]: {label: "Act", hierarchy: 2},
  [MatsukazeObjectTypes.sceneSequence]: {label: "Scene sequence", hierarchy: 3},
  [MatsukazeObjectTypes.scene]: {label: "Scene", hierarchy: 4},
  [MatsukazeObjectTypes.beat]: {label: "Beat", hierarchy: 5},
  [MatsukazeObjectTypes.momentSequence]: {label: "Moment sequence", hierarchy: 6},
  [MatsukazeObjectTypes.moment]: {label: "Moment", hierarchy: 7},
  [MatsukazeObjectTypes.dialogueLine]: {label: "Dialogue line", hierarchy: 8}
}

export class StoryStructureElement extends MatsukazeObject implements Positioned, StoryNode {

  matsukazeObjectType: MatsukazeObjectTypes;
  projectId: string;
  parentId: number;
  position: number;
  children$: Observable<StoryStructureElement[]>;
  children: StoryStructureElement[] = [];

  constructor(params: any) {
    super(params);
    this.projectId = params.projectId;
    this.parentId = params.parentId;
    this.position = params.position;
    this.children = [];
  }

  getNavLabel(): string { return null; }

}

export class Story extends StoryStructureElement {

  title: string;
  summary: string;
  notes: string;
  matsukazeObjectType: MatsukazeObjectTypes = MatsukazeObjectTypes.story;

  constructor(params: any) {
    super(params);
    this.title = params.title;
    this.summary = params.summary;
    this.notes = params.note;
    if(params?.children) {
      for(let child of params?.children) {
        this.children.push(new Act(child));
      }
    }
  }

  getNavLabel(): string { return "Story"; }

  toParams(): any {
    let params: any = {};
    params.matsukazeObjectType = this.matsukazeObjectType;
    params.id = this.id;
    params.title = this.title;
    params.summary = this.summary;
    params.notes = this.notes;
    return params;
  }
}

export class Act extends StoryStructureElement {

  title: string;
  summary: string;
  notes: string;
  matsukazeObjectType: MatsukazeObjectTypes = MatsukazeObjectTypes.act;

  constructor(params: any) {
    super(params);
    this.title = params.title;
    this.summary = params.summary;
    this.notes = params.notes;
    if(params?.children) {
      for(let child of params?.children) {
        this.children.push(new SceneSequence(child));
      }
    }
  }

  getNavLabel(): string { return "Act " + this.position; }

  toParams(): any {
    let params: any = {};
    params.matsukazeObjectType = this.matsukazeObjectType;
    params.id = this.id;
    params.title = this.title;
    params.summary = this.summary;
    params.notes = this.notes;
    return params;
  }
}

export class SceneSequence extends StoryStructureElement {

  title: string;
  summary: string;
  notes: string;
  matsukazeObjectType: MatsukazeObjectTypes = MatsukazeObjectTypes.sceneSequence;

  constructor(params: any) {
    super(params);
    this.title = params.title;
    this.summary = params.summary;
    this.notes = params.notes;
    if(params?.children) {
      for(let child of params?.children) {
        this.children.push(new Scene(child));
      }
    }
  }

  getNavLabel(): string { return "Scene sequence " + this.position; }

  toParams(): any {
    let params: any = {};
    params.matsukazeObjectType = this.matsukazeObjectType;
    params.id = this.id;
    params.title = this.title;
    params.summary = this.summary;
    params.notes = this.notes;
    return params;
  }
}

export class Scene extends StoryStructureElement {

  summary: string;
  notes: string;
  matsukazeObjectType: MatsukazeObjectTypes = MatsukazeObjectTypes.scene;

  constructor(params: any) {
    super(params);
    this.summary = params.summary;
    this.notes = params.notes;
    if(params?.children) {
      for(let child of params?.children) {
        this.children.push(new Beat(child));
      }
    }
  }

  getNavLabel(): string { return "Scene " + this.position; }

  toParams(): any {
    let params: any = {};
    params.matsukazeObjectType = this.matsukazeObjectType;
    params.id = this.id;
    params.summary = this.summary;
    params.notes = this.notes;
    return params;
  }
}

export class Beat extends StoryStructureElement {

  summary: string;
  notes: string;
  matsukazeObjectType: MatsukazeObjectTypes = MatsukazeObjectTypes.beat;

  constructor(params: any) {
    super(params);
    this.summary = params.summary;
    this.notes = params.notes;
    if(params?.children) {
      for(let child of params?.children) {
        this.children.push(new MomentSequence(child));
      }
    }
  }

  getNavLabel(): string { return "Beat " + this.position; }

  toParams(): any {
    let params: any = {};
    params.matsukazeObjectType = this.matsukazeObjectType;
    params.id = this.id;
    params.summary = this.summary;
    params.notes = this.notes;
    return params;
  }
}

export class MomentSequence extends StoryStructureElement {

  summary: string;
  notes: string;
  matsukazeObjectType: MatsukazeObjectTypes = MatsukazeObjectTypes.momentSequence;

  constructor(params: any) {
    super(params);
    this.summary = params.summary;
    this.notes = params.notes;
    if(params?.children) {
      for(let child of params?.children) {
        this.children.push(new Moment(child));
      }
    }
  }

  getNavLabel(): string { return "Moment seqence " + this.position; }

  toParams(): any {
    let params: any = {};
    params.matsukazeObjectType = this.matsukazeObjectType;
    params.id = this.id;
    params.summary = this.summary;
    params.notes = this.notes;
    return params;
  }
}

export class Moment extends StoryStructureElement {

  action: string;
  notes: string;
  matsukazeObjectType: MatsukazeObjectTypes = MatsukazeObjectTypes.moment;

  constructor(params: any) {
    super(params);
    this.action = params.action;
    this.notes = params.notes;
    if(params?.children) {
      for(let child of params?.children) {
        this.children.push(new DialogueLine(child));
      }
    }
  }

  getNavLabel(): string { return "Moment " + this.position; }

  toParams(): any {
    let params: any = {};
    params.matsukazeObjectType = this.matsukazeObjectType;
    params.id = this.id;
    params.action = this.action;
    params.notes = this.notes;
    return params;
  }
}

export class DialogueLine extends StoryStructureElement {

  type: string;
  source: string;
  i18nBundle: I18nBundle;
  matsukazeObjectType: MatsukazeObjectTypes = MatsukazeObjectTypes.dialogueLine;

  constructor(params: any) {
    super(params);
    this.type = params.type;
    this.source = params.source;
    if(params.i18nBundle) this.i18nBundle = new I18nBundle(params.i18nBundle);
  }

  getText(language: string): string {
    if(this.i18nBundle) return this.i18nBundle.getText(language); else return null;
  }

  getNavLabel(): string { return "Dialogue line " + this.position; }

  toParams(): any {
    let params: any = {};
    params.matsukazeObjectType = this.matsukazeObjectType;
    params.id = this.id;
    params.type = this.type;
    params.i18nBundle = this.i18nBundle;
    return params;
  }

}

// PUBLICATION ELEMENTS ----------------------------------------------------

export class Page extends MatsukazeObject implements Positioned {
  id: number;
  position: number;
  type: MatsukazeObjectTypes = MatsukazeObjectTypes.page;

  publicationId: string;
  summary: string;
  notes: string;
  beats: Beat[] = [];

  constructor(params: any) { super(params); }

}
