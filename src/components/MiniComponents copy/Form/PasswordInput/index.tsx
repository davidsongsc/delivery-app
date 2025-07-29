"use client";

import React, { useMemo } from "react";
import { Progress, Typography } from "antd";
import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import {
  PasswordCriterion,
  PasswordFeedbackProps,
  ProgressStatus,
} from "@/enum/PasswordCriterion";

const PasswordFeedback: React.FC<PasswordFeedbackProps> = ({ password }) => {
  const criteria = useMemo(() => {
    return {
      [PasswordCriterion.LENGTH]: password?.length >= 8,
      [PasswordCriterion.UPPERCASE]: /[A-Z]/.test(password),
      [PasswordCriterion.NUMBER]: /\d/.test(password),
      [PasswordCriterion.SPECIAL]: /[\W_]/.test(password),
    };
  }, [password]);

  const passedCount = useMemo(
    () => Object.values(criteria).filter(Boolean)?.length,
    [criteria]
  );

  const progressStatus = useMemo(() => {
    if (passedCount <= 1) return "exception";
    if (passedCount === 2) return "normal";
    return "success";
  }, [passedCount]);

  const progressPercent = useMemo(
    () => (passedCount / Object.keys(criteria)?.length) * 100,
    [passedCount, criteria]
  );

  return (
    <>
      <Progress
        percent={progressPercent}
        status={progressStatus as ProgressStatus}
        showInfo={false}
        size={["100%", 8]}
        className="!mb-2 [&_.ant-progress-inner]:!bg-site-gray"
        // h-[32px] rounded-md border px-3 siteMd:h-[38px]
      />

      <div className="flex flex-col gap-1">
        {Object.entries(criteria).map(([label, passed]) => (
          <div key={label} className="flex items-center gap-2">
            {passed ? (
              <CheckCircleFilled className="text-xs text-green-600" />
            ) : (
              <CloseCircleOutlined className="text-xs text-gray-400" />
            )}
            <Typography.Text
              className={`text-xs ${passed ? "text-green-600" : "text-gray-500"}`}
            >
              {label}
            </Typography.Text>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(PasswordFeedback);
