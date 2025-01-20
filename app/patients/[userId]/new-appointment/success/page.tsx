import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const Success = async ({ params, searchParams }: SearchParamProps) => {
  const { userId } = await params;
  const { appointmentId } = await searchParams;

  if (!appointmentId || typeof appointmentId !== "string") {
    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <h1 className="header">Error!</h1>
        <p>Missing or invalid appointment ID in the URL.</p>
      </div>
    );
  }

  try {
    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find(
      (doc) => doc.name === appointment.primaryPhysician
    );

    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <div className="success-img">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              className="h-10 w-fit"
              alt="logo"
            />
          </Link>

          <section className="flex flex-col items-center">
            <Image
              src="/assets/gifs/success.gif"
              alt="success"
              width={200}
              height={300}
              unoptimized
              className="gif"
            />
            <h2 className="header mb-6 max-w-[600px] text-center">
              Your <span className="text-green-500">appointment request</span>{" "}
              has been successfully submitted!
            </h2>
            <p>We will be in touch shortly to confirm</p>
          </section>

          <section className="request-details">
            <p>Requested appointment details</p>
            <div className="flex items-center gap-3">
              <Image
                src={doctor?.image!}
                alt="doctor"
                width={100}
                height={100}
                className="size-6"
              />
              <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
            </div>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calender"
                width={24}
                height={24}
              />
              <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
          </section>

          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>

          <p className="copyright mt-10 py-12">© 2025 MediPulse</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <h1 className="header">Error!</h1>
        <p>Unable to load appointment details.</p>
      </div>
    );
  }
};

export default Success;
