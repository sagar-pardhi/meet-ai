"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "../../hooks/use-confirm";
import { ActiveState } from "./components/active-state";
import { CancelledState } from "./components/cancelled-state";
import { CompletedState } from "./components/completed-state";
import { MeetingIdViewHeader } from "./components/meeting-id-view-header";
import { ProcessingState } from "./components/processing-state";
import { UpcomingState } from "./components/upcoming-state";
import { UpdateMeetingDialog } from "./components/update-meeting-dialog";

interface MeetingIdViewProps {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: MeetingIdViewProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const [updateMeetingDialog, setUpdateMeetingDialog] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meeting"
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError(error, variables, context) {
        toast.error(error.message);
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <div className="flex flex-col flex-1 pb-4 px-4 md:px-8 gap-y-4">
        <RemoveConfirmation />
        <UpdateMeetingDialog
          open={updateMeetingDialog}
          onOpenChange={setUpdateMeetingDialog}
          initialValues={data}
        />
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialog(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <CompletedState data={data} />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a few seconds"
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meeting"
      description="Please try again later"
    />
  );
};
