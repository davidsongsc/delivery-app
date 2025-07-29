import { Form, Input } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useAgreementsCourses } from '@/hooks/useAgreementsCourses';
import SelectCourseAutoComplete from '@/components/Courses/AutoComplete';
import SelectCourseCategoriesAutoComplete from '@/components/CategoryCourses/AutoComplete';
import SelectCourseClassesAutoComplete from '@/components/Courses/CourseClass/AutoComplete';
import Masks from '@/utils/masks';

interface ISaleCourseFormItemProps {
    courseForm: {
        id: number;
    };
    isActive: boolean;
    form: any;
    selectedCategories: Record<number, string | null>;
    setSelectedCategories: React.Dispatch<React.SetStateAction<Record<number, string | null>>>;
    handleMoneyChange: (value: string | undefined, field: string, id: number) => void;
    removeCourseForm: (id: number) => void;
    courseFormsLength: number;
}

const SaleCourseFormItem: React.FC<ISaleCourseFormItemProps> = ({
    courseForm,
    isActive,
    form,
    selectedCategories,
    setSelectedCategories,
    handleMoneyChange,
    removeCourseForm,
    courseFormsLength,
}) => {
    const courseId = Form.useWatch(`course_id_${courseForm.id}`, form);

    const { agreementsCourses } = useAgreementsCourses(
        useMemo(
            () => ({
                filters: {
                    'course_id': courseId,
                },
            }),
            [courseId]
        )
    );

    return (
        <div key={courseForm.id} className="relative grid grid-cols-12 gap-3 py-2">
            {courseFormsLength > 1 && (
                <button
                    type="button"
                    onClick={() => removeCourseForm(courseForm.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
                    disabled={!isActive}
                    title="Remover curso"
                >
                    <FaTrash />
                </button>
            )}

            <Form.Item
                className="lg:col-span-2"
                label="Categoria de Curso"
                name={`category_id_${courseForm.id}`}
                rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
                <SelectCourseCategoriesAutoComplete
                    actualCourseCategories={[]}
                    isDisabled={!isActive}
                    onChange={(selectedCategory) => {
                        setSelectedCategories({
                            ...selectedCategories,
                            [courseForm.id]: selectedCategory,
                        });
                    }}
                />
            </Form.Item>

            <Form.Item
                className="lg:col-span-6"
                label="Curso"
                name={`course_id_${courseForm.id}`}
                rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
                <SelectCourseAutoComplete
                    actualCourse={[]}
                    courseCategoriesID={selectedCategories[courseForm.id] || undefined}
                    isDisabled={!isActive}
                    isSale={isActive}
                    onChange={(id, course) => {
                        const agreement = agreementsCourses?.find(ac => ac.course_id === course?.id);

                        const value = agreement
                            ? agreement.agreed_value
                            : course?.sale_value;

                        form.setFieldsValue({
                            [`category_id_${courseForm.id}`]: course?.course_category_id || null,
                            [`deal_value_${courseForm.id}`]: Masks.money(Number(value).toFixed(2)) || null
                        });
                    }}

                />
            </Form.Item>

            <Form.Item
                noStyle
                shouldUpdate={(prev, curr) =>
                    prev[`course_id_${courseForm.id}`] !== curr[`course_id_${courseForm.id}`]
                }
            >
                {() => {
                    const hasCourseSelected = !!form.getFieldValue(`course_id_${courseForm.id}`);
                    return (
                        <Form.Item
                            className="lg:col-span-2"
                            label="Turma"
                            name={`courseClass_${courseForm.id}`}
                        >
                            <SelectCourseClassesAutoComplete
                                actualCourseClasses={[]}
                                courseId={form.getFieldValue(`course_id_${courseForm.id}`)}
                                isDisabled={!hasCourseSelected || !isActive}
                            />
                        </Form.Item>
                    );
                }}
            </Form.Item>

            <Form.Item
                className="lg:col-span-2"
                name={`deal_value_${courseForm.id}`}
                label="Valor negociado"
                rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
                <Input
                    readOnly={true}
                    onChange={(e) => handleMoneyChange(e.target.value, 'deal_value', courseForm.id)}
                    placeholder="R$ 0,00"
                />
            </Form.Item>


            {agreementsCourses?.length > 0 && (
                <div className="col-span-12 text-sm text-white">
                    {agreementsCourses.length} acordo(s) encontrado(s) para este curso.
                </div>
            )}
        </div>
    );
};

export default SaleCourseFormItem;
