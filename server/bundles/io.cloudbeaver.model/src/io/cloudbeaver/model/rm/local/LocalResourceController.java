/*
 * DBeaver - Universal Database Manager
 * Copyright (C) 2010-2022 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.cloudbeaver.model.rm.local;

import io.cloudbeaver.DBWConstants;
import org.jkiss.code.NotNull;
import org.jkiss.code.Nullable;
import org.jkiss.dbeaver.DBException;
import org.jkiss.dbeaver.Log;
import org.jkiss.dbeaver.model.auth.SMCredentials;
import org.jkiss.dbeaver.model.auth.SMCredentialsProvider;
import org.jkiss.dbeaver.model.exec.DBCFeatureNotSupportedException;
import org.jkiss.dbeaver.model.rm.RMController;
import org.jkiss.dbeaver.model.rm.RMProject;
import org.jkiss.dbeaver.model.rm.RMResource;
import org.jkiss.dbeaver.runtime.DBWorkbench;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Resource manager API
 */
public class LocalResourceController implements RMController {

    private static final Log log = Log.getLog(LocalResourceController.class);

    private static final String PROJECT_PREFIX_GLOBAL = "g_";
    private static final String PROJECT_PREFIX_SHARED = "s_";
    private static final String PROJECT_PREFIX_USER = "u_";

    private final SMCredentialsProvider credentialsProvider;

    private final Path rootPath;
    private final Path userProjectsPath;
    private final Path sharedProjectsPath;
    private final String globalProjectName;

    public LocalResourceController(
        SMCredentialsProvider credentialsProvider,
        Path rootPath,
        Path userProjectsPath,
        Path sharedProjectsPath) {
        this.credentialsProvider = credentialsProvider;
        this.rootPath = rootPath;
        this.userProjectsPath = userProjectsPath;
        this.sharedProjectsPath = sharedProjectsPath;

        this.globalProjectName = DBWorkbench.getPlatform().getApplication().getDefaultProjectName();
    }

    private Path getGlobalProjectPath() {
        return this.rootPath.resolve(this.globalProjectName);
    }

    private Path getPrivateProjectPath() {
        SMCredentials activeUserCredentials = credentialsProvider.getActiveUserCredentials();
        String userId = activeUserCredentials == null ? null : activeUserCredentials.getUserId();
        return userId == null ? null : this.userProjectsPath.resolve(userId);
    }

    @NotNull
    @Override
    public RMProject[] listAccessibleProjects() throws DBException {
        try {
            List<RMProject> projects = Files.list(sharedProjectsPath)
                .map((Path path) -> makeProjectFromPath(path, PROJECT_PREFIX_SHARED))
                .filter(Objects::isNull)
                .collect(Collectors.toList());
            RMProject globalProject = makeProjectFromPath(getGlobalProjectPath(), PROJECT_PREFIX_GLOBAL);
            if (globalProject != null) {
                projects.add(globalProject);
            }
            RMProject userProject = makeProjectFromPath(getPrivateProjectPath(), PROJECT_PREFIX_USER);
            if (userProject != null) {
                projects.add(0, userProject);
            }
            return projects.toArray(new RMProject[0]);
        } catch (IOException e) {
            throw new DBException("Error reading projects", e);
        }
    }

    private RMProject makeProjectFromPath(Path path, String prefix) {
        if (path == null || !Files.exists(path) || !Files.isDirectory(path)) {
            return null;
        }
        RMProject project = new RMProject();
        project.setName(path.getFileName().toString());
        project.setId(prefix + project.getName());
        project.setShared(prefix.equals(PROJECT_PREFIX_SHARED));
        try {
            project.setCreateTime(new Date(Files.getLastModifiedTime(path).toMillis()));
        } catch (IOException e) {
            log.error(e);
        }

        return project;
    }

    @NotNull
    @Override
    public RMProject[] listSharedProjects() throws DBException {
        try {
            return Files.list(sharedProjectsPath)
                .map((Path path) -> makeProjectFromPath(path, PROJECT_PREFIX_SHARED))
                .filter(Objects::isNull)
                .toArray(RMProject[]::new);
        } catch (IOException e) {
            throw new DBException("Error reading shared projects", e);
        }
    }

    @Override
    public void createProject(@NotNull RMProject project) throws DBException {
        throw new DBCFeatureNotSupportedException();
    }

    @Override
    public void deleteProject(@NotNull String projectId) throws DBException {
        throw new DBCFeatureNotSupportedException();
    }

    @NotNull
    @Override
    public RMResource[] listResources(@NotNull String projectId, @Nullable String folder, @Nullable String nameMask, boolean readProperties, boolean readHistory) throws DBException {
        throw new DBCFeatureNotSupportedException();
    }

    @Override
    public String createResource(@NotNull String projectId, @NotNull String folder, @NotNull RMResource resource) throws DBException {
        throw new DBCFeatureNotSupportedException();
    }

    @Override
    public String updateResource(@NotNull String projectId, @NotNull String folder, @NotNull RMResource resource) throws DBException {
        throw new DBCFeatureNotSupportedException();
    }

    @Override
    public String moveResource(@NotNull String projectId, @NotNull String oldResourcePath, @NotNull String newResourcePath) throws DBException {
        throw new DBCFeatureNotSupportedException();
    }

    @Override
    public void deleteResource(@NotNull String projectId, @NotNull String resourcePath, boolean recursive) throws DBException {
        throw new DBCFeatureNotSupportedException();
    }

    @NotNull
    @Override
    public byte[] getResourceContents(@NotNull String projectId, @NotNull String resourcePath) throws DBException {
        throw new DBCFeatureNotSupportedException();
    }

    @NotNull
    @Override
    public String setResourceContents(@NotNull String projectId, @NotNull String resourcePath, @NotNull String contentType, @NotNull byte[] data) throws DBException {
        throw new DBCFeatureNotSupportedException();
    }

    public static Builder builder(SMCredentialsProvider credentialsProvider) {
        return new Builder(credentialsProvider);
    }

    public static final class Builder {
        private final SMCredentialsProvider credentialsProvider;

        private Path rootPath;
        private Path userProjectsPath;
        private Path sharedProjectsPath;

        private Builder(SMCredentialsProvider credentialsProvider) {
            this.credentialsProvider = credentialsProvider;
            this.rootPath = DBWorkbench.getPlatform().getWorkspace().getAbsolutePath();
            this.userProjectsPath = this.rootPath.resolve(DBWConstants.USER_PROJECTS_FOLDER);
            this.sharedProjectsPath = this.rootPath.resolve(DBWConstants.SHARED_PROJECTS_FOLDER);
        }

        public Builder setRootPath(Path rootPath) {
            this.rootPath = rootPath;
            return this;
        }

        public Builder setUserProjectsPath(Path userProjectsPath) {
            this.userProjectsPath = userProjectsPath;
            return this;
        }

        public Builder setSharedProjectsPath(Path sharedProjectsPath) {
            this.sharedProjectsPath = sharedProjectsPath;
            return this;
        }

        public LocalResourceController build() {
            return new LocalResourceController(credentialsProvider, rootPath, userProjectsPath, sharedProjectsPath);
        }
    }
}