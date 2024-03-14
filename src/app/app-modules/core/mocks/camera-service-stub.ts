export class CameraServiceStub {
  public capture(titleAlign = 'center') {}

  public viewImage(benImageCode: string, titleAlign = 'center') {}

  public annotate(image: string, points: any, titleAlign = 'center') {}

  public graph() {}

  public close(): void {}
}
