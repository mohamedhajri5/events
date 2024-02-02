export interface Event {
    _id: string;
    eventName: string;
    cover?: string;
    startDate?: Date;
    startTime?: string;
    description?: string;
    type: "physical" | "virtual";
    universityLocation?: string;
    state?: string;
    placeName?: string;
    locationLink?: string;
    locationDescription?: string;
    virtualApp?: string;
    virtualLink?: string;
}