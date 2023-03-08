import { FormOption } from 'src/app/shared/components/form-controls';

export class Helpers {
  public static setFormOptions<T, Key extends keyof T>(
    response: T[],
    valueName: Key,
    displayName: Key,
    placeHolder?: string
  ): FormOption[] | [] {
    if (response.length === 0) return [];

    const options: FormOption[] = [];

    if (placeHolder) {
      options.push({
        value: 0,
        displayName: placeHolder
      });
    }

    response.forEach((r: T) => {
      options.push({
        value: r[valueName],
        displayName: String(r[displayName])
      });
    });

    return options;
  }
}
