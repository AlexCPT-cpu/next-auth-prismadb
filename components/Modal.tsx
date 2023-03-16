import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Input from "./Input";
import useTask from "../hooks/useTasks";
import useCurrentUser from "../hooks/useCurrentUser";

const people = [
  { name: "Create Like a Post Task" },
  /*{ name: "Create Comment on a Post Task" },
  { name: "Create Follow an Account Task" },*/
];

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [selected, setSelected] = useState(people[0]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [type, setType] = useState("Instagram Follow Task");
  const [postUrl, setPostUrl] = useState("");

  const { data: currentUser, mutate } = useCurrentUser();
  const { data: tasks = [] } = useTask();

  const toogleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const toogleNext = useCallback(() => {
    setIsOpen(!isOpen);
    setNextPage(!nextPage);
  }, [isOpen, nextPage]);

  const onSubmit = () => {
    setIsOpen(false);
    setNextPage(false);
  };

  const createTask = useCallback(async () => {
    let response;

    response = await axios.post("/api/create", {
      title,
      description,
      experience,
      type,
      postUrl,
    });

    const updated = response?.data;

    mutate({
      ...updated.updatedUser,
      tasks: tasks,
    });
    mutate();
    onSubmit();
  }, [mutate, experience, title, description, type, tasks, postUrl]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={toogleModal}
          className="rounded-md bg-white flex flex-row items-center bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create <FaInstagram fill="pink" className="mx-2" size={20} /> Task
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toogleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden border rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-400"
                  >
                    Instagram Tasks
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-3">
                      Select an instagram task to create below
                    </p>
                  </div>

                  <div className="mb-20 mt-8">
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">
                            {selected.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {people.map((person, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-green-100 text-green-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={person}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {person.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={toogleNext}
                    >
                      Next
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={nextPage} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toogleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black border p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-400"
                  >
                    Instagram Tasks
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-3">
                      Fill all the options below to create task
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Input
                      id="title"
                      type="text"
                      label="Title"
                      value={title}
                      onChange={(e: any) => {
                        setTitle(e.currentTarget.value);
                      }}
                    />
                    <Input
                      id="desc"
                      type="text"
                      label="Description"
                      value={description}
                      onChange={(e: any) => {
                        setDescription(e.currentTarget.value);
                      }}
                    />

                    <Input
                      type="number"
                      id="xp"
                      label="Xp Points"
                      value={experience}
                      onChange={(e: any) => {
                        setExperience(e.currentTarget.value);
                      }}
                    />

                    <Input
                      type="text"
                      id="post"
                      label="Url"
                      value={postUrl}
                      onChange={(e: any) => {
                        setPostUrl(e.currentTarget.value);
                      }}
                    />
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={createTask}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
