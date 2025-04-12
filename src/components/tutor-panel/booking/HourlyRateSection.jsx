import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import tutorApi from "@/api/tutorApi";

import FormInput from "@/components/common/FormInput";
import FormSubmitButton from "@/components/common/FormSubmitButton";

const schema = z.object({
  hourly_rate: z
    .string()
    .regex(/^\d+$/, "請填寫預約價格")
    .transform((val) => Number(val)),
});

export default function HourlyRateSection() {
  const tutorId = useSelector((state) => state.auth?.userData?.tutor_id);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [loadingState, setLoadingState] = useState(false);

  const getTutorHourlyRate = useCallback(async () => {
    setLoadingState(true);
    try {
      const result = await tutorApi.getTutorDetail(tutorId);
      setHourlyRate(Number(result.data.hourly_rate));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  }, [tutorId]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  useEffect(() => {
    getTutorHourlyRate();
    reset({
      hourly_rate: hourlyRate,
    });
  }, [getTutorHourlyRate, hourlyRate, reset]);

  const onSubmit = async (data) => {
    try {
      await tutorApi.updateTutorData(tutorId, data);
      Swal.fire({
        icon: "success",
        title: "修改成功",
      });

      getTutorHourlyRate();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "修改失敗",
        text: error.response?.data?.message || "發生錯誤，請稍後再試",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loadingState ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <FormInput register={register} errors={errors} id="hourly_rate" labelText="預約價格 / 小時 (請輸入給學員預約時的金額 / 小時 ex. 50)" type="number" />
          <FormSubmitButton buttonStyle={"mt-8"} isLoading={isSubmitting} buttonText={"更新價格"} loadingText={"更新中"} roundedRadius={2} withIcon={false} withSlideRightAnimation={false} />
        </>
      )}
    </form>
  );
}
