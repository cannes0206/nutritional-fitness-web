export enum ValidationType {
  required = 1,
  date = 2,
  email = 3,
  passwordsMismatch = 4
}

export class FormItem {
   public controlName: string;
   public label: string;
   public validationType?: ValidationType;
   public option?: Array<FormOption>;
   public placeHolder?: string;
   public textMask?: any;
   public minLength?: number;
   public icon?: string;
   public dateFormat?: string;
   public hasClearButton?: boolean;

    constructor(
        controlName: string,
        label: string,
        validation?: ValidationType,
        option?: Array<FormOption>,
        placeHolder?: string,
        textMask?: string,
        minLength?: number,
        icon?: string,
        dateFormat?: string,
        hasClearButton?: boolean
        ) {
        this.controlName = controlName;
        this.label = label;
        this.validationType = validation;
        this.option = option;
        this.placeHolder = placeHolder;
        this.textMask = textMask;
        this.minLength = minLength;
        this.icon = icon;
        this.dateFormat = dateFormat;
        this.hasClearButton = hasClearButton;
   }
}

export class FormOption {
   public value?: any;
   public displayName?: string;
   public hide?: boolean;
}

